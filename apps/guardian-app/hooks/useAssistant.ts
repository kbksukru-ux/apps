import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import api from '@/lib/api';

export function useAssistant() {
  const sessionRef = useRef<string>(crypto.randomUUID());
  return useMutation({
    mutationFn: async (message: string) => {
      try {
        const { data } = await api.post(`/chat/${sessionRef.current}/message`, {
          message,
          history: [],
        });
        return data.data.reply;
      } catch (error) {
        console.error('Assistant API error:', error);
        throw new Error('Asistan yanıt veremedi. Lütfen tekrar deneyin.');
      }
    },
  });
}

