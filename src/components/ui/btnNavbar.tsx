import clsx from 'clsx';

type Props = {
  estaAberto: boolean;
  setEstaAberto: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BotaoHamburguer({ estaAberto, setEstaAberto }: Props) {
  const alternarMenu = () => {
    setEstaAberto(!estaAberto);
  };

  return (
    <button
      className="w-4 h-3 flex justify-between flex-col"
      onClick={alternarMenu}
      aria-label="Alternar menu"
      aria-expanded={estaAberto}
    >
      <div className="flex justify-end w-full">
        <div
          className={clsx(
            'border border-black w-2 h-0.5 transition-all duration-300 ease-in-out',
            {
              'rotate-45 translate-y-[5px] translate-x-[-2px] w-3': estaAberto,
              'animate-dance-back': !estaAberto,
            }
          )}
        ></div>
      </div>
      <div className="flex justify-end w-full">
        <div
          className={clsx(
            'border border-black w-full h-0.5 transition-all duration-300 ease-in-out',
            {
              'opacity-0': estaAberto,
              'animate-dance-back': !estaAberto,
            }
          )}
        ></div>
      </div>
      <div className="flex justify-start w-full">
        <div
          className={clsx(
            'border border-black w-2 h-0.5 transition-all duration-300 ease-in-out',
            {
              '-rotate-45 -translate-y-[5px] translate-x-[2px] w-3': estaAberto,
              'animate-dance-back': !estaAberto,
            }
          )}
        ></div>
      </div>
    </button>
  );
}