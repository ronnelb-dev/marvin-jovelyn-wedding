import Divider3 from "@/components/Divider-3";

type PageHeaderSectionProps = {
  title: string;
};

export function PageHeaderSection({ title }: PageHeaderSectionProps) {
  return (
    <section className="relative bg-cover bg-center text-white text-center overflow-hidden pt-20">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold mb-4 text-[#8B7355]">
        {title}
      </h1>
      <div className="flex justify-center items-center gap-2 mb-10 sm:mb-12 text-[#8B7355]">
        <Divider3 position="top" width={200} height={80} />
      </div>
    </section>
  );
}

export default PageHeaderSection;
