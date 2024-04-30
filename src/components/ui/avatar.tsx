import { userConfig } from "@/lib/config";
import Image from "next/image";

interface AvatarProps {
  imageUrl?: string;
  name?: string;
}

const Avatar = ({ imageUrl, name }: AvatarProps) => {
  return (
    <Image
      src={imageUrl ?? userConfig.defaultUserImage}
      data-testid="user-avatar"
      width={36}
      height={36}
      alt={name ?? "Anonymous User"}
      className="object-cover duration-300 rounded-full cursor-pointer hover:ring-4 hover:ring-accent"
    />
  );
};

export default Avatar;
