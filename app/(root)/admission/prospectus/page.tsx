import PDFViewer from '../../components/PDF/PDFViewer';

const Prospectus = () => {
  const pdfs = [
    {
      title: 'Robotics Championship 2024 Report',
      file: '/pdf/sabbir_mohammad_sami_resume.pdf',
    },
    {
      title: 'Robotics Championship 2024 Report',
      file: '/pdf/sabbir_mohammad_sami_resume.pdf',
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">View and Download PDF Files</h2>
      {pdfs.map((pdf, idx) => (
        <PDFViewer key={idx} file={pdf.file} title={pdf.title} />
      ))}
    </div>
  );
};

export default Prospectus;
