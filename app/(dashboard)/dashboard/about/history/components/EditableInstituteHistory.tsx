'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetList, useUpdate } from '@/hooks/APIHooks';
import { toast } from '@/hooks/use-toast';
import { FilePenLine } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface HistoryData {
  _id: string;
  title: string;
  image: string;
  description: string;
}

const EditableInstituteHistory = () => {
  const { data: historyData, isLoading } = useGetList<HistoryData>('/history', 'history');
  const { mutateAsync: updateHistory, isPending: isUpdating } = useUpdate<HistoryData>(
    '/history',
    'history',
  );

  const [history, setHistory] = useState<HistoryData>({
    _id: '',
    title: 'History of Our Institute',
    description: `শিক্ষা মানুষের মৌলিক অধিকার। দেশ-জাতিকে গড়ে তোলাই সকল শিক্ষার মূল উদ্দেশ্য। 
    সমাজ ও রাষ্ট্র গঠনের জন্য এবং উন্নতজীবন গড়ার জন্য সুশিক্ষার প্রয়োজন। মানবিক মূল্যবোধ, 
    চারিত্রিক উৎকর্ষ ও মনুষ্যত্ব বিকাশের জন্য এবং বর্তমান বিশ্বে টিকে থাকার জন্য সুশিক্ষা অতীব প্রয়োজন।`,
    image: '/logo/logo.jpg',
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (historyData && historyData.length > 0) {
      setHistory(historyData[0]);
    }
  }, [historyData]);

  const handleEdit = () => {
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setHistory((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSave = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('title', history.title);
      formData.append('description', history.description);
      if (file) {
        formData.append('image', file);
      }

      await updateHistory({
        id: history._id,
        body: formData as unknown as Partial<HistoryData>,
        callbacks: {
          onSuccess: () => {
            toast({
              title: 'Success',
              description: 'Institute history updated successfully',
            });
            setDialogOpen(false);
          },
          onError: () => {
            toast({
              title: 'Error',
              description: 'Failed to update institute history',
              variant: 'destructive',
            });
          },
        },
      });
    } catch (error) {
      console.error('Failed to update institute history:', error);
    }
  }, [history, file, updateHistory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editable">
      <h2 className="heading">{history.title}</h2>
      <div className="py-6 relative">
        <div className="mx-auto border-b pb-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${history.image}`}
            alt="Institute Logo"
            width={500}
            height={500}
            className="w-72 mx-auto h-auto rounded-t-lg"
          />
        </div>
        <div className="p-6 pt-6">
          <h2 className="text-3xl font-semibold pb-4">{history.title}</h2>
          <p>{history.description}</p>
        </div>

        <Button
          onClick={handleEdit}
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-black rounded-full"
        >
          <FilePenLine className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Institute History</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div>
              <Label htmlFor="historyTitle">Title</Label>
              <Input
                id="historyTitle"
                value={history.title}
                onChange={(e) => setHistory((prev) => ({ ...prev, title: e.target.value }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="historyContent">Content</Label>
              <textarea
                id="historyContent"
                value={history.description}
                onChange={(e) => setHistory((prev) => ({ ...prev, description: e.target.value }))}
                rows={5}
                className="mt-2 w-full border rounded-md p-2"
              ></textarea>
            </div>
            <div>
              <Label htmlFor="historyImage">Image</Label>
              <Input
                id="historyImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
              {history.image && (
                <Image
                  src={
                    history.image.startsWith('data:') || history.image.startsWith('blob:')
                      ? history.image
                      : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${history.image}`
                  }
                  alt="Preview"
                  width={200}
                  height={200}
                  className="mt-2 object-cover rounded-md"
                />
              )}
            </div>
          </div>
          <Button onClick={handleSave} disabled={isUpdating} className="w-full">
            {isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditableInstituteHistory;
