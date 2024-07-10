import { db } from "@/lib/db";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { auth } from "@/auth";

const app = new Hono()
  .get("/", async (c) => {
    // console.log('request received')
    const session = await auth();
    // console.log(session)
    // const okay = await getUserId()
    // console.log(okay)
    if (!session) {
      console.log("Authentication failed")
      return c.redirect("/sign-in");
    }
    // console.log('db check',session?.user?.id)
    try {
      const tasks = await db.task.findMany({
        where: {
          userId: session?.user?.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      // console.log("Tasks fetched successfully:", tasks);
      return c.json({ tasks });
    } catch (error) {
      console.error("Database query failed:", error);
      return c.json({ error: "Failed to fetch tasks" }, 500);
    }
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),

    async (c) => {
      const session = await auth();
      if (!session) {
        return c.redirect("/sign-in");
      }

      const { id } = c.req.valid("param");

      const task = await db.task.findUnique({
        where: {
          id,
        },
      });
      return c.json({ task }, 200);
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string(),
        desc: z.string(),
        icon: z.enum(["ALARM_CLOCK","OFFICE_WORK" ,"WEIGHT_LIFT", "BOOK", "COFFEE_CUP","MESSAGE"]),
        status: z.enum(["IN_PROGRESS", "COMPLETED", "WONT_DO", "TODO"]),
      })
    ),
    async (c) => {
      const session = await auth();
      if (!session) {
        return c.redirect("/sign-in");
      }

      const { title, desc, icon, status } = c.req.valid("json");

      const task = await db.task.create({
        data: {
          title,
          desc,
          icon,
          status,
          user: {
            connect: {
              id: session?.user?.id,
            },
          },
        },
      });
      return c.json({ task }, 200);
    }
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      z.object({
        title: z.string(),
        desc: z.string(),
        icon: z.enum(["ALARM_CLOCK", "WEIGHT_LIFT", "BOOK", "COFFEE_CUP", "MESSAGE", "OFFICE_WORK"]),
        status: z.enum(["IN_PROGRESS", "COMPLETED", "WONT_DO", "TODO"]),
      })
    ),
    async (c) => {
      const session = await auth();
      if (!session) {
        return c.redirect("/sign-in");
      }

      const { id } = c.req.valid("param");

      const { title, desc, icon, status } = c.req.valid("json");

      const task = await db.task.update({
        where: {
          id,
        },
        data: {
          title,
          desc,
          icon,
          status,
        },
      });
      return c.json({ task }, 200);
    }
   )
   .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const session = await auth();
      if (!session) {
        return c.redirect("/sign-in");
      }

      const { id } = c.req.valid("param");

      const task = await db.task.delete({
        where: {
          id,
        },
      });
      return c.json({ task }, 200);
    }
  );
  

export default app;
