import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ImportantLink from '../../components/shared/ImportentLink';

const AboutAside = () => {
  const relatedTopics = [
    {
      name: 'At A Glance',
      link: 'https://bijoyschool.com/at-a-glance',
      icon: <ChevronRight className="inline w-5 mb-1 text-yellow-400" />,
    },
    {
      name: 'History',
      link: 'https://bijoyschool.com/history',
      icon: <ChevronRight className="inline w-5 mb-1 text-yellow-400" />,
    },
    {
      name: 'Why Study at Our Institute',
      link: 'https://bijoyschool.com/why-study-at-mcpsc',
      icon: <ChevronRight className="inline w-5 mb-1 text-yellow-400" />,
    },
    {
      name: 'Mission and Vision',
      link: 'https://bijoyschool.com/mission-and-vision',
      icon: <ChevronRight className="inline w-5 mb-1 text-yellow-400" />,
    },
    {
      name: 'Infrastructure',
      link: 'https://bijoyschool.com/infrastructure',
      icon: <ChevronRight className="inline w-5 mb-1 text-yellow-400" />,
    },
    {
      name: 'Achievements',
      link: 'https://bijoyschool.com/achievement',
      icon: <ChevronRight className="inline w-5 mb-1 text-yellow-400" />,
    },
    {
      name: 'News & Events',
      link: 'https://bijoyschool.com/news-events',
      icon: <ChevronRight className="inline w-5 mb-1 text-yellow-400" />,
    },
  ];

  return (
    <div className="">
      <div className="border-s p-4 pt-0  sticky top-20">
        <h2 className="heading">Related Topics</h2>
        <ul className="mt-2  space-y-2 px-4 py-5 bg-orange-100 shadow-lg">
          {relatedTopics.map((topic, index) => (
            <li key={index}>
              <Link href={topic.link} passHref>
                {topic.icon}
                <span className="ml-2">{topic.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ImportantLink />
    </div>
  );
};

export default AboutAside;
