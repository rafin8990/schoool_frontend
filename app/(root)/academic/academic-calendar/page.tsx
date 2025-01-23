import Image from 'next/image';
import Notice from '../../components/home/Notice';
import ImportantLink from '../../components/shared/ImportentLink';

const AcademicCalendar = () => {
  return (
    <section>
      <h2 className="heading">Academic Calendar</h2>
      <div className="grid grid-cols-9 gap-4 py-4">
        <div className="col-span-6">
          <div className="">
            <Image
              src={'/acd.jpg'}
              alt="acd.jpg"
              width={800}
              height={1000}
              className="w-full h-auto"
            ></Image>
          </div>
        </div>
        <div className="col-span-3">
          <Notice />
          <ImportantLink />
        </div>
      </div>
    </section>
  );
};

export default AcademicCalendar;
