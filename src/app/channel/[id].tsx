import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';
import { supabase } from '~/lib/supabase';

const fetchChannel = async (id: string) => {
  const { data, error } = await supabase.from('yt_channels').select('*').eq('id', id).single();
  if (error) {
    throw error;
  }
  return data;
};

export default function Channel() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: channel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['channel', id],
    queryFn: () => fetchChannel(id),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView className="flex-1">
      {/* Banner Image */}
      <Image source={{ uri: channel.banner_img }} className="h-40 w-full object-cover" />

      <View className="p-4">
        {/* Profile Section */}
        <View className="flex-row items-center gap-4">
          <Image source={{ uri: channel.profile_image }} className="h-20 w-20 rounded-full" />
          <View className="flex-1">
            <Text className="text-2xl font-bold">{channel.name}</Text>
            <Text className="text-gray-600">{channel.handle}</Text>
            <View className="mt-2 flex-row gap-4">
              <Text className="text-gray-600">
                {channel.subscribers.toLocaleString()} subscribers
              </Text>
              <Text className="text-gray-600">{channel.videos_count} videos</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <Text className="mt-6 text-gray-800">{channel.Description}</Text>

        {/* Stats Grid */}
        <View className="mt-6 flex-row justify-between rounded-lg bg-gray-50 p-4">
          <View className="items-center">
            <Text className="text-xl font-bold">{(channel.views / 1000000).toFixed(1)}M</Text>
            <Text className="text-gray-600">Total Views</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold">
              {new Date(channel.created_date).getFullYear()}
            </Text>
            <Text className="text-gray-600">Joined</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold">{channel.location}</Text>
            <Text className="text-gray-600">Location</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
