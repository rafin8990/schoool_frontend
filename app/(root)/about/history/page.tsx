'use client';
import { useGetList } from '@/hooks/APIHooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HistoryData {
  _id: string;
  title: string;
  image: string;
  description: string;
}

const InstituteHistory = () => {
  const { data: historyData } = useGetList<HistoryData>('/history', 'history');
  const [history, setHistory] = useState<HistoryData>({
    _id: '',
    title: 'History of Our Institute',
    description: `শিক্ষা মানুষের মৌলিক অধিকার। দেশ-জাতিকে গড়ে তোলাই সকল শিক্ষার মূল উদ্দেশ্য। 
       সমাজ ও রাষ্ট্র গঠনের জন্য এবং উন্নতজীবন গড়ার জন্য সুশিক্ষার প্রয়োজন। মানবিক মূল্যবোধ, 
       চারিত্রিক উৎকর্ষ ও মনুষ্যত্ব বিকাশের জন্য এবং বর্তমান বিশ্বে টিকে থাকার জন্য সুশিক্ষা অতীব প্রয়োজন।`,
    image: '/logo/logo.jpg',
  });

  useEffect(() => {
    if (historyData && historyData.length > 0) {
      setHistory(historyData[0]);
    }
  }, [historyData]);
  return (
    <div>
      <h2 className="heading">History of Our Institute</h2>
      <div className="">
        <div className="py-6">
          <div className="mx-auto border-b pb-4">
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
                className="mt-2 object-cover rounded-md mx-auto max-h-60 w-auto"
              />
            )}
          </div>
          <div className="p-6 pt-6">
            <h2 className="text-3xl font-semibold pb-4">History of Our Institute</h2>
            <p>{history.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteHistory;
