import { useTranslations } from "next-intl";

export default function SignUpPage() {

  const t = useTranslations('HomePage');

  return (
    <main className="">
      <h2 className="text-green-300 font-bold text-2xl">SING UP</h2>
    </main>
  );
}
