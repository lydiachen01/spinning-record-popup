// RecordPlayer.tsx
import '../styles/RecordPlayer.css';

const RecordPlayer = ({ imageUrl }: { imageUrl: string }) => (
    <div className="record">
        <img src={imageUrl} className="center-art" />
    </div>
);
export default RecordPlayer;
