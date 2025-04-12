import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

interface DetailModalProps {
  title?: string;
  content?: React.ReactNode;
}

export default function DetailModal({ title, content }: DetailModalProps) {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  return (
    <>
      <Button 
        onClick={toggleModal} 
        variant="gradient" 
        size="sm" 
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        Open Details
      </Button>
      <Dialog 
        open={open} 
        handler={toggleModal} 
        size="md"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <DialogHeader placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
          {title || "Document Details"}
        </DialogHeader>
        <DialogBody placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
          <div className="flex flex-col gap-4">
            {content || (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm">No additional details available.</p>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
          <Button 
            variant="text" 
            color="red" 
            onClick={toggleModal} 
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
} 