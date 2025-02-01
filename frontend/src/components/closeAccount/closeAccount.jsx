import React, { useState } from "react";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shadcn/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";

const CloseAccountPage = () => {
  return (
    <Card className="w-[60%] mx-auto dark:bg-gray-800" style={{ maxWidth: "900px" }}>
      <CardHeader>
        <CardTitle>Account Security</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-md text-gray-600 dark:text-gray-300">
          <span className="text-red-500 dark:text-red-400">Warning: </span>If you close your account, you will be unsubscribed from all
          0 of your courses and will lose access to your account and data
          associated with your account forever, even if you choose to create a
          new account using the same email address in the future.
        </p>
        <p className="mt-2 text-md text-gray-600 dark:text-gray-300">
          Please note, if you want to reinstate your account after submitting a
          deletion request, you will have 14 days after the initial submission
          date to reach out to{" "}
          <a href="mailto:astralTech@gmail.com" className="text-blue-500">
            astralTech@gmail.com
          </a>{" "}
          to cancel this request.
        </p>

        {/* Dialog Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="mt-4 w-full md:w-auto">
              Close Account
            </Button>
          </DialogTrigger>

          {/* Dialog Content */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                Enter your password to confirm. This action cannot be undone and
                will permanently delete your account and data.
              </DialogDescription>
            </DialogHeader>
            <form className="mt-4">
              <div className="flex flex-col gap-4">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <Button type="submit" className="w-full">
                  Confirm
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CloseAccountPage;
