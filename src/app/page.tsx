import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations('HomePage');

  return (
    <main className="">
      <h2 className="text-yellow-300 font-bold text-2xl">{t('title')}</h2>
    </main>
  );
}
