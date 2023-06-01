import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import cn  from "classnames" ;
type Props ={
    children : any

}

export default function Layout({children}: Props) {
  return (
    <main className={cn("h-full w-full  min-h-screen")}>
        <Toaster />
    <Sidebar>
      {children}
      </Sidebar>
      </main>
  );
}
