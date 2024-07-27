import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
  const [calls, setcalls] = useState<Call[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    (async() => {
      if(!client || !user?.id) return;
      
      setisLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{field: 'starts_at', direction: -1}],
          filter_conditions: {
            starts_at : { $exists: true},
            $or: [
              { created_by_user_id: user.id },
              { memebers: { $in: [user.id] }},
            ]
          }
        });

        setcalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false)
      }
    })();
  },[user?.id, client])

  const now = new Date();

  const endedCalls = calls.filter(({state: { startsAt, endedAt}}: Call) => {
    return (startsAt && new Date(startsAt) < now || !!endedAt)
  });
   
  const upcomingCalls = calls.filter(({state: {startsAt}}: Call) => {
    return (startsAt && new Date(startsAt) > now)
  });
  
  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading,
  }
}