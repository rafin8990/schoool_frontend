/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import DeleteIcon from '@/components/shared/icons/DeleteIcon';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDelete } from '@/hooks/APIHooks';
import { useToast } from '@/hooks/use-toast';
import React, { useCallback, useState } from 'react';

const DeleteNoticeModal = (data: any) => {
  const [file, setFile] = useState(data.pdfUrl || (null as File | null));
  const [title, setTitle] = useState(data.title || '');
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const { mutateAsync: deleteEvent } = useDelete('/notice', 'notice');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();

      try {
        await deleteEvent({
          id,
          callbacks: {
            onSuccess: () => {
              toast({
                variant: 'destructive',
                title: 'Event deleted successfully',
                // description: 'Event deleted successfully',
              });
            },
            onError: () => {
              toast({
                title: 'Error',
                description: 'Failed to delete event',
                variant: 'destructive',
              });
            },
          },
        });

        // Reset form
        setFile(null);
        setTitle('');
        setIsOpen(false);
      } finally {
        setIsUploading(false);
      }
    },
    [file, title, toast],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-black text-white hover:bg-gray-300 hover:text-black px-5 py-3 rounded-md flex justify-center gap-3 items-center ">
          <DeleteIcon /> Delete Notice
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-red-600 text-2xl">Delete Notice ?</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e, data._id)} className="space-y-6">
          <div className="space-y-4"></div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center gap-4">
            <Button
              type="submit"
              disabled={!file || !title.trim() || isUploading}
              className="w-full sm:w-auto  bg-red-600 min-w-20"
            >
              {isUploading ? 'Deleting...' : 'Delete'}
            </Button>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto min-w-20"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNoticeModal;
