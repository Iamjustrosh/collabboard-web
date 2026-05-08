export default function Footer() {
  return (
    <>
      <footer className="border-t py-6 text-center text-sm text-gray-600 mt-20 flex flex-col items-center justify-center gap-2">
        <div className=""> © {new Date().getFullYear()} CollabBoard. All Rights Reserved. </div>
        <div className="">Developed with ❤️ by The Team Roshan, Nikita and Happy</div>
   
      </footer>

    </>
  );
}
