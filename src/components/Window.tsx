import { Rnd } from "react-rnd";
import { IIcon } from '@utils/interfaces';
import React from 'react';

interface WindowProps {
  icon: IIcon;
  id: number;
  defaults?: { x: number, y: number, width: number, height: number };
}

interface WindowState {
  windowSizeDefault: { width: number, height: number };  // Dimensiones por defecto
  windowSize: { width: number, height: number };  // Dimensiones actuales de la ventana
  isVisible: boolean;  // Visibilidad de la ventana
  isMaximized: boolean;  // Estado maximizado/restaurado
  exists: boolean
}



class Window extends React.Component<WindowProps, WindowState> {
  constructor(props: WindowProps) {
    super(props);
    this.state = {
      windowSizeDefault: { width: window.innerWidth, height: window.innerHeight },
      windowSize: { width: 700, height: 400 },  // Tamaño inicial
      isVisible: true,  // Inicialmente visible
      isMaximized: false,  // Estado inicial no maximizado
      exists: true
    };
  }


  componentDidMount() {
    window.addEventListener('resize', this.updateWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowSize);
  }

  // Actualiza las dimensiones de la ventana predeterminada al cambiar el tamaño del navegador
  updateWindowSize = () => {
    this.setState({
      windowSizeDefault: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  // Cierra la ventana
  handleClose = () => {
    this.setState({ exists: false});
  };

  // Minimiza la ventana ocultándola
  handleMinimize = () => {
    this.setState({ isVisible: false });
  };

  // Alterna entre maximizar y restaurar el tamaño de la ventana
  handleMaximize = () => {
    const { isMaximized } = this.state;
    if (isMaximized) {
      // Restaurar tamaño predeterminado cuando esté maximizado
      this.setState({
        isMaximized: false,
        windowSize: { width: 700, height: 400 },
      });
    } else {
      // Maximizar al tamaño completo de la ventana
      this.setState({
        isMaximized: true,
        windowSize: { width: parent.innerWidth - 48, height: parent.innerHeight - 110 },
      });
    }
  };
  


  render() {
    const { icon, defaults } = this.props;
    const { windowSizeDefault, windowSize, isMaximized, isVisible, exists } = this.state;
    if (!isVisible) return null;
    if (!exists) return null;

    // Posiciones por defecto para centrar la ventana cuando no esté maximizada
    const defaultX = isMaximized ? 0 : (windowSizeDefault.width - windowSize.width) / 2;
    const defaultY = isMaximized ? 0 : (windowSizeDefault.height - windowSize.height) / 2;

    return  (
      
      <Rnd
        className="absolute bg-gray-100/50 rounded shadow-xl flex flex-col translate-x-0 translate-y-0"
        dragHandleClassName="drag-handle"
        default={{
          x: defaults?.x || defaultX,
          y: defaults?.y || defaultY,
          width: defaults?.width || windowSize.width,
          height: defaults?.height || windowSize.height,
        }}
        size={windowSize}  // Tamaño de la ventana actual
        position={isMaximized ? { x: 0, y: 0 } : undefined}  // Posición al maximizar
        enableResizing={!isMaximized}  // Desactiva redimensionamiento al maximizar
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
        {/* Barra de arrastre */}
        <div
          className="drag-handle w-full bg-gray-800 h-8 absolute top-0 cursor-move rounded-t-md flex flex-row items-center justify-between px-8"
          onDoubleClick={this.handleMaximize}  // Doble clic para maximizar/restaurar
        >
          <div className="flex flex-row gap-4">
            <img src={icon?.img} className="w-4" alt="Icon" />
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

        {/* Contenido de la ventana (iframe) */}
        <div className="w-full h-full pt-8 flex-grow flex">
          <iframe
            className="w-full h-full border-none"
            title={icon?.name}
          />
        </div>
      </Rnd>
    );
  }
}

export default Window;
