import { View, Text, Image } from 'react-native';

const channel = {
  input: {
    url: 'https://www.youtube.com/@jaidenanimations/about',
  },
  url: 'https://www.youtube.com/@jaidenanimations/about',
  handle: '@jaidenanimations',
  handle_md5: '4e2083f32de8c4dca0e500600bd36486',
  banner_img:
    'https://yt3.googleusercontent.com/-MdSCWVLkfJpq2I461HndvpVObRlxKAxx5_zDdI7Ob5gJfEA_sAEpeZ7QDaHplClYi_bDbXi=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
  profile_image:
    'https://yt3.googleusercontent.com/gopbHeiDtEB932rIFqLlR4D_hFtd-BcdGrQgGeyDpkD3guskkbT74DsJYPGo3x7MqkyqtgL-=s160-c-k-c0x00ffffff-no-rj',
  name: 'JaidenAnimations',
  subscribers: 14200000,
  Description:
    "hi it's jaiden and bird\n\nchannel profile picture made by: me\nchannel banner art made by: https://twitter.com/motiCHIKUBI\n",
  videos_count: 158,
  created_date: '2014-02-16T00:00:00.000Z',
  views: 2756154727,
  Details: {
    location: 'United States',
  },
  Links: [
    'twitch.tv/jaidenanimations',
    'twitter.com/JaidenAnimation',
    'instagram.com/jaiden_animations',
    'jaidenanimations.com',
  ],
  identifier: 'UCGwu0nbY2wSkW8N-cghnLpA',
  id: 'UCGwu0nbY2wSkW8N-cghnLpA',
  timestamp: '2025-01-17T14:35:58.484Z',
};

export default function Channel() {
  return (
    <View className="flex-1">
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
            <Text className="text-xl font-bold">{channel.Details.location}</Text>
            <Text className="text-gray-600">Location</Text>
          </View>
        </View>

        {/* Links */}
        <View className="mt-6">
          <Text className="mb-2 font-bold">Links</Text>
          {channel.Links.map((link, index) => (
            <Text key={index} className="mb-1 text-blue-600">
              {link}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
