import Desktop from "@components/Desktop";
import Taskbar from "@components/Taskbar";
import { IIcon } from "@utils/interfaces";
import Background from "@assets/Backgrounds/Background1.svg";

export default function Screen() {
  // For now, I'll only use small icons
  const DesktopIcons: IIcon[] = [
    {
      id: 1,
      name: "My PC",
      size: "small",
      img: "https://img.icons8.com/fluency/256/workstation.png",
      appUrl: "",
      action: () => console.log("My PC"),
      type: 'dt'
    },{
      id: 2,
      name: "Google",
      size: "small",
      img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      appUrl: "https://www.google.com",
      type: 'dt'
    },{
      id: 3,
      name: "Google",
      size: "small",
      img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      appUrl: "https://www.google.com",
      type: 'dt'
    }
  ];
  
  const TaskbarIcons: IIcon[] = [
    {
      id: 1,
      name: "Google",
      size: "small",
      img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      appUrl: "https://www.google.com",
      type: 'tb'
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-cover bg-no-repeat -z-20" style={{ backgroundImage: `url(${Background})` }}>
      <div className="flex-grow overflow-auto p-2">
        <Desktop Icons={DesktopIcons} />
      </div>
      <div className="w-full">
        <Taskbar Icons={TaskbarIcons} />
      </div>
    </div>
  );
}
