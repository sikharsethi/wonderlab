import { notFound } from 'next/navigation';
import Learner from '@/components/Learner';
import { ALL, getSubject } from '@/content/all';
export const generateStaticParams = () => ALL.map(s => ({ id: s.id }));
export default function Page({ params }: { params: { id: string } }) {
  const s = getSubject(params.id); if (!s) notFound();
  return <Learner s={s} />;
}
