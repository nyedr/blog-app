import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserAccountContextType } from "./layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProfileData, profileSchema } from "@/lib/zod/profile";
import { useSession } from "next-auth/react";

interface ProfileFormProps {
  defaultValues?: ProfileData;
  setUserAccount: UserAccountContextType["setUserAccount"];
}

const ProfileForm = ({ setUserAccount, defaultValues }: ProfileFormProps) => {
  const { data: session, update } = useSession();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const handleUserUpdate = async (data: ProfileData) => {
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        ...data,
      },
    };

    await update(newSession);
  };

  const onSubmit: SubmitHandler<ProfileData> = async (profileData) => {
    setUserAccount(profileData as ProfileData);
    handleUserUpdate(profileData as ProfileData);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="hover:bg-secondary" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="hover:bg-secondary" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Textarea
                  className="w-full hover:bg-secondary"
                  placeholder="Tell us about yourself"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium">Profile image</FormLabel>
              <FormControl>
                <Input
                  className="hover:bg-secondary"
                  type="url"
                  required={false}
                  placeholder="https://example.com/image.png"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
