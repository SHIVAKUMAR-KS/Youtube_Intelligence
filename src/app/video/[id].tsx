import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { ScrollView, View, Text, Image } from 'react-native';
import { supabase } from '~/lib/supabase';

const fetchVideo = async (id: string) => {
  const { data, error } = await supabase
    .from('yt_videos')
    .select('*, yt_channels(*)')
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export default function Video() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: video,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchVideo(id),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  console.log(video);

  return (
    <ScrollView className="flex-1">
      {/* Video Preview/Player */}
      <Image source={{ uri: video.preview_image }} className="h-56 w-full object-cover" />

      <View className="p-4">
        {/* Video Info */}
        <Text className="text-2xl font-bold">{video.title}</Text>

        <View className="mt-4 flex-row justify-between">
          <Text className="text-gray-600">{video.views.toLocaleString()} views</Text>
          <Text className="text-gray-600">{new Date(video.date_posted).toLocaleDateString()}</Text>
        </View>

        {/* Channel Info */}
        <View className="mt-6 flex-row items-center gap-4">
          <Image
            source={{ uri: video.yt_channels.profile_image }}
            className="h-12 w-12 rounded-full"
          />
          <View>
            <Text className="font-semibold">{video.yt_channels.name}</Text>
            <Text className="text-gray-600">
              {video.yt_channels.subscribers.toLocaleString()} subscribers
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text className="mt-6 text-gray-800" numberOfLines={3}>
          {video.description}
        </Text>

        {/* Stats */}
        <View className="mt-6 flex-row gap-4">
          <Text className="text-gray-600">{video.likes.toLocaleString()} likes</Text>
          {/* <Text className="text-gray-600">{video.comments_count.toLocaleString()} comments</Text> */}
        </View>
      </View>
    </ScrollView>
  );
}
