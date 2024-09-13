import { useTranslations } from "next-intl";

export default function SignInPage() {

  const t = useTranslations('HomePage');

  return (
    <main className="">
      <h2 className="text-yellow-300 font-bold text-2xl">SING IN</h2>
    </main>
  );
}
