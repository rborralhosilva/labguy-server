import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prismaclient";
import { Prisma } from "@prisma/client";

export class ProfileController {
  // READ
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);

    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
      include: {
        contact: {
          include: {
            socialmedia: true,
          },
        },
      },
    });
    res.status(200).json(profile);
  });

  // UPDATE SINGLE
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);
    console.log("BODY:", req.body);
    const p = req.body;
    const cArr = p.contact;

    if (!Array.isArray(cArr)) throw new Error("Contact field is not an array");

    async function updateProfile() {
      delete p.contact;
      await prisma.profile.update({
        where: { userId: userId },
        data: p,
      });
    }

    async function updateContact() {
      console.log("Received contact array:", cArr);

      // Ensure we delete contacts that are not in the received array
      await prisma.contact.deleteMany({
        where: {
          profileId: userId,
          NOT: cArr.map((cItem: Prisma.ContactWhereUniqueInput) => ({
            id: cItem.id,
          })),
        },
      });

      // overwrite
      for (const cItem of cArr) {
        console.log("Processing contact with ID:", cItem.id);

        await prisma.contact.upsert({
          where: { id: cItem.id || 0 },
          update: {
            email: cItem.email,
            profileId: userId,
            socialmedia: {
              deleteMany: {
                contactId: cItem.id,
                NOT: cItem.socialmedia.map(
                  (smItem: Prisma.SocialMediaWhereUniqueInput) => ({
                    id: smItem.id,
                  }),
                ),
              },
              upsert: cItem.socialmedia.map(
                (smItem: Prisma.SocialMediaCreateManyInput) => ({
                  where: { id: smItem.id || 0 },
                  create: {
                    platform: smItem.platform,
                    profileUrl: smItem.profileUrl,
                    username: smItem.username,
                  },
                  update: {
                    platform: smItem.platform,
                    profileUrl: smItem.profileUrl,
                    username: smItem.username,
                  },
                }),
              ),
            },
          },
          create: {
            email: cItem.email,
            profileId: userId,
            socialmedia: {
              create: cItem.socialmedia.map(
                (smItem: Prisma.SocialMediaCreateManyInput) => ({
                  platform: smItem.platform,
                  profileUrl: smItem.profileUrl,
                  username: smItem.username,
                }),
              ),
            },
          },
        });
      }
    }

    await updateProfile();
    await updateContact();

    res.status(200).send({});
  });
}
