import Navigation from './component/navigation';

export default async function Home() {
  return (
    <div className="flex flex-col">
      <div className="menu flex gap-10">
        <Navigation />
      </div>
    </div>
  );
}
