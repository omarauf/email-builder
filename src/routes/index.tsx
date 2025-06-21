import { createFileRoute } from '@tanstack/react-router';
import { EmailBuilder } from '@/components/builder';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return <EmailBuilder name="default" onSubmit={(v) => console.log(v)} />;
}
