import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

export default function DetailModal({ title, content }) {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  return (
    <>
      <Button onClick={toggleModal} variant="gradient" size="sm">
        Open Details
      </Button>
      <Dialog open={open} handler={toggleModal} size="md">
        <DialogHeader>{title || "Document Details"}</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            {content || (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm">No additional details available.</p>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={toggleModal}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
} 