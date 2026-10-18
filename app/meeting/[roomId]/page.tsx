import MeetingRoom from './room';
export default function MeetingPage({ params }: { params: { roomId: string } }) { return <MeetingRoom roomId={params.roomId} />; }
