import { Icons } from "@/components/icons";

const Loading = ({ size = 10 }: { size?: number }) => {
  return (
    <div className="grid place-items-center w-full h-full">
      <Icons.loader
        width={size}
        height={size}
        className="animate-spin text-primary"
      />
    </div>
  );
};

export default Loading;
