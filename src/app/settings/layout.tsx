"use client";

import { useToast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import {
  QueryClient,
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext } from "react";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";
import { ProfileData } from "@/lib/zod/profile";
import Loading from "@/app/loading";
import { getUserAccount, setUserAccountPatch } from "../api/user/[name]/route";
import { useRouter } from "next/navigation";

export type UserAccountContextType = {
  userAccount: User | null;
  setUserAccount: UseMutateFunction<User | null, Error, ProfileData, unknown>;
};

export const AccountContext = createContext<UserAccountContextType>({
  userAccount: null,
  setUserAccount: async () => {},
});

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });
  const { toast } = useToast();

  const { data: userAccount, status } = useQuery<User>({
    queryKey: ["userAccount"],
    queryFn: () => getUserAccount(session?.user?.name!),
    enabled: !!session?.user,
  });

  const { mutate: setUserAccount } = useMutation({
    mutationFn: (userData: ProfileData) =>
      setUserAccountPatch(userAccount?.name ?? session?.user.name!, userData),
    onSuccess(data) {
      queryClient.setQueryData(["userAccount"], data);
      toast({
        title: "Account successfuly updated",
        description:
          "Your account has been updated, it will take some time to see the changes.",
      });
    },
    onError(error) {
      toast({
        title: error.name ?? "Something went wrong",
        description: error.message,
      });
    },
  });

  return (
    <AccountContext.Provider
      value={{
        userAccount: (userAccount as User) ?? null,
        setUserAccount,
      }}
    >
      <Container className="pt-4 pb-8 space-y-6 sm:py-10 sm:pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="relative flex-1 lg:max-w-2xl">
            {status === "pending" ? <Loading size={50} /> : children}
          </div>
        </div>
      </Container>
    </AccountContext.Provider>
  );
};

export default SettingsLayout;
