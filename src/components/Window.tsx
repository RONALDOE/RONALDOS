import React from 'react';
import { Rnd } from "react-rnd";
import { IIcon } from '@utils/interfaces';
import { GlobalValuesContext } from "@utils/GlobalValuesContext";

interface WindowProps {
  icon: IIcon;
  id: number;
  defaults?: { x: number, y: number, width: number, height: number };
}

interface WindowState {
  windowSizeDefault: { width: number, height: number };
  windowSize: { width: number, height: number };
  isVisible: boolean;
  isMaximized: boolean;
  exists: boolean;
}

class Window extends React.Component<WindowProps, WindowState> {
  static contextType = GlobalValuesContext;
  declare context: React.ContextType<typeof GlobalValuesContext>;

  constructor(props: WindowProps) {
    super(props);
    this.state = {
      windowSizeDefault: { width: window.innerWidth, height: window.innerHeight },
      windowSize: { width: 700, height: 400 },
      isVisible: true,
      isMaximized: false,
      exists: true,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowSize);
  }

  updateWindowSize = () => {
    this.setState({
      windowSizeDefault: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleClose = () => {
    const { id } = this.props;
    const { setOpenApps } = this.context;
    this.setState({ exists: false });
    setOpenApps((prevApps: IIcon[]) => prevApps.filter((app) => app.id !== id));
  };

  handleMinimize = () => {
    this.setState({ isVisible: !this.state.isVisible, isMaximized: false,
    });
  };

  handleMaximize = () => {
    const { isMaximized } = this.state;
    if (isMaximized) {
      this.setState({
        isMaximized: false,
        windowSize: { width: 700, height: 400 },
        isVisible: true,
      });
    } else {
      this.setState({
        isMaximized: true,
        windowSize: { width: window.innerWidth - 48, height: window.innerHeight - 110 },
        isVisible: true,

      });
    }
  };

  render() {
    const { icon, defaults } = this.props;
    const { windowSizeDefault, windowSize, isMaximized, isVisible, exists } = this.state;

    if (!exists) return null;

    const defaultX = (windowSizeDefault.width - windowSize.width) / 2;
    const defaultY = (windowSizeDefault.height - windowSize.height) / 2;

    if (!isVisible) {
      // Render the minimized bar
      return (
        <Rnd
          className={``}
          dragHandleClassName="drag-handle"
          enableResizing={!isMaximized}
          disableDragging={isMaximized}
          disableResizing
        >
          <div
            className="drag-handle w-64 bg-gray-800 h-8 absolute top-0 cursor-move rounded-t-md flex flex-row items-center justify-between px-8"
            onDoubleClick={this.handleMaximize}
          >
            <div className="flex flex-row gap-2">
              <img src={icon?.img} className="w-6 object-contain " alt="Icon" />
              <p className="text-white text-sm">{icon?.name}</p>
            </div>
            <div className="flex flex-row gap-2">
              <button onClick={this.handleMinimize}>
                <img src="https://img.icons8.com/fluency/256/minimize-window--v2.png" className="w-7" alt="Minimize Button" />
              </button>
              <button onClick={this.handleMaximize}>
                <img
                  src={
                    isMaximized
                      ? "https://img.icons8.com/fluency/256/restore-window.png"
                      : "https://img.icons8.com/fluency/256/maximize-window.png"
                  }
                  className="w-7"
                  alt="Maximize/Restore Button"
                />
              </button>
              <button onClick={this.handleClose}>
                <img src="https://img.icons8.com/fluency/256/close-window--v1.png" className="w-7" alt="Close Button" />
              </button>
            </div>
          </div>
         
        </Rnd>
      );
    }

    return (
      <Rnd
        className={`absolute bg-gray-100/50 rounded shadow-xl flex flex-col ${isVisible ? "" : "hidden"}`}
        dragHandleClassName="drag-handle"
        default={{
          x: defaults?.x || defaultX,
          y: defaults?.y || defaultY,
          width: defaults?.width || windowSize.width,
          height: defaults?.height || windowSize.height,
        }}
        size={windowSize}
        position={isMaximized ? { x: 0, y: 0 } : undefined}
        enableResizing={!isMaximized}
        disableDragging={isMaximized}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            windowSize: {
              width: ref.offsetWidth,
              height: ref.offsetHeight,
            },
          });
        }}
      >
        <div
          className="drag-handle w-full bg-gray-800 h-8 absolute top-0 cursor-move rounded-t-md flex flex-row items-center justify-between px-8"
          onDoubleClick={this.handleMaximize}
        >
          <div className="flex flex-row gap-2">
            <img src={icon?.img} className="w-6 object-contain" alt="Icon" />
            <p className="text-white text-sm">{icon?.name}</p>
          </div>
          <div className="flex flex-row gap-4">
            <button onClick={this.handleMinimize}>
              <img src="https://img.icons8.com/fluency/256/minimize-window--v2.png" className="w-7" alt="Minimize Button" />
            </button>
            <button onClick={this.handleMaximize}>
              <img
                src={
                  isMaximized
                    ? "https://img.icons8.com/fluency/256/restore-window.png"
                    : "https://img.icons8.com/fluency/256/maximize-window.png"
                }
                className="w-7"
                alt="Maximize/Restore Button"
              />
            </button>
            <button onClick={this.handleClose}>
              <img src="https://img.icons8.com/fluency/256/close-window--v1.png" className="w-7" alt="Close Button" />
            </button>
          </div>
        </div>
        <div className="w-full h-full pt-8 flex-grow flex">
          <iframe className="w-full h-full border-none" title={icon?.name} />
        </div>
      </Rnd>
    );
  }
}

export default Window;
