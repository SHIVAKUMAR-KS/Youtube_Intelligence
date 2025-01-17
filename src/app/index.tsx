import { Stack, Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';

import { Container } from '~/components/Container';
import { supabase } from '~/lib/supabase';

const POPULAR_CHANNELS = [
  { name: 'MKBHD', url: 'https://youtube.com/@mkbhd' },
  { name: 'Veritasium', url: 'https://youtube.com/@veritasium' },
  { name: 'Fireship', url: 'https://youtube.com/@Fireship' },
  { name: 'Kurzgesagt', url: 'https://youtube.com/@kurzgesagt' },
];

export default function Home() {
  const [url, setUrl] = useState('');

  const startAnalyzing = async () => {
    const { error, data } = await supabase.functions.invoke('trigger_collection_api', {
      body: { url },
    });
    console.log('error: ', error);
    console.log('data: ', data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'YouTube Analyzer' }} />
      <View className="flex-1 bg-white p-2">
        <ScrollView className="flex-1">
          {/* Hero Section */}
          <View className="py-12">
            <Text className="mb-2 text-center text-4xl font-bold">YouTube Channel Analyzer</Text>
            <Text className="mb-8 text-center text-gray-600">
              Discover insights about any YouTube channel
            </Text>
            {/* Search Input */}
            <View className="px-4">
              <View className="flex-row items-center space-x-2 rounded-2xl bg-gray-100 p-2 shadow-sm">
                <TextInput
                  value={url}
                  onChangeText={setUrl}
                  placeholder="Paste YouTube channel URL"
                  placeholderTextColor="#6B7280"
                  className="h-12 flex-1 px-4 text-lg text-gray-900"
                />

                <Pressable
                  onPress={startAnalyzing}
                  className="h-12 items-center justify-center rounded-xl bg-red-600 px-8">
                  <Text className="text-lg font-semibold text-white">Analyze</Text>
                </Pressable>
              </View>
              <Text className="mt-2 text-center text-sm text-gray-500">
                Example: https://youtube.com/@mkbhd
              </Text>
            </View>
            {/* Popular Channels */}
            <View className="mt-12">
              <Text className="mb-4 px-4 text-lg font-semibold">Popular Channels</Text>
              <View className="flex-row flex-wrap gap-2 px-4">
                {POPULAR_CHANNELS.map((channel) => (
                  <Link key={channel.url} href="/channel" asChild>
                    <Pressable className="rounded-full bg-gray-100 px-4 py-2">
                      <Text className="text-gray-900">{channel.name}</Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
            </View>
            {/* Recent Searches */}
            <View className="mt-12">
              <Text className="mb-4 px-4 text-lg font-semibold">Recent Searches</Text>
              <View className="divide-y divide-gray-200">
                {[1, 2, 3].map((i) => (
                  <Link key={i} href="/channel" asChild>
                    <Pressable className="flex-row items-center px-4 py-4">
                      <View className="mr-3 h-10 w-10 rounded-full bg-gray-200" />
                      <View>
                        <Text className="font-medium">Channel Name {i}</Text>
                        <Text className="text-sm text-gray-600">2.5M subscribers</Text>
                      </View>
                    </Pressable>
                  </Link>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
