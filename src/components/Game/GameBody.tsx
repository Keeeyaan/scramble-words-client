import ScrambleGame from './ScrambleGame';
import { socket } from '../../connections/socket';

const GameBody = ({
  players,
  isHost,
  host,
}: {
  players: string[];
  isHost: boolean;
  host: string;
}) => {
  const totalPlayers = players.length;
  const radius = 120 + 10 * (totalPlayers - 1);
  const angle = 360 / totalPlayers; // Angle between each player

  return (
    <>
      {players.map((player, index) => {
        const rotateAngle = angle * index;
        const translateX = Math.cos((rotateAngle * Math.PI) / 180) * radius;
        const translateY = Math.sin((rotateAngle * Math.PI) / 180) * radius;
        return (
          <div
            key={player}
            style={{
              transform: `translate(${translateX}px, ${translateY}px)`,
            }}
            className="absolute top-[47%] left-[47%]"
          >
            <div
              className={`w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center text-center`}
            >
              <h1 className="text-md font-bold text-gray-800">{player}</h1>
            </div>
          </div>
        );
      })}
      {isHost && socket.id === host && players.length > 1 && (
        <div className="flex justify-center m-5">
          <button className="py-2 px-4 bg-green-400 text-white  font-bold rounded">
            Start
          </button>
        </div>
      )}
    </>
  );
};

export default GameBody;
