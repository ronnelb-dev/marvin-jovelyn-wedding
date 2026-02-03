
// Timeline item type
export interface TimelineItem {
  title: string;
  img: string;
  text: string;
  date: string;
  reverse: boolean;
  hasVideo: boolean;
  videoType?: "youtube" | "local";
  videoUrl?: string;
}

export interface PersonProfile {
  name: string;
  img: string;
  text: string;
}

// Move data outside component to prevent recreation on every render
export const timelineData: TimelineItem[] = [
  {
    title: "Connected Through Friends",
    img: "/images/met-through-friend.webp",
    text: "Back in first year college, Junna studied at STI Santa Rosa and made friends there. After a year in Bulacan, she returned to STI, where her old friends had made new ones—including Ronnel. They started hanging out in groups and shared occasional jokes, but never really talked one-on-one. On July 18, 2016, Ronnel was invited to one of Junna's best friend's surprise birthday party. That's when he added her on Facebook… but they never chatted (yet!). 😄",
    date: "July 18, 2016",
    reverse: false,
    hasVideo: false,
  },
  {
    title: "The First Chat",
    img: "/images/first_chat.webp",
    text: "During the 2nd semester enrollment, Ronnel and Junna happened to sit next to each other while waiting in line. That unexpected moment gave them the chance to finally talk. After the enrollment, Ronnel gathered the courage to message Junna on Messenger—and from there, their conversations just kept flowing. They still can't remember why none of their other friends were around that day, but looking back, they knew—it was God's perfect timing. 💬✨",
    date: "November 8, 2016 ",
    reverse: true,
    hasVideo: false,
  },
  {
    title: "The Graduation Ball Coat Moment",
    img: "/images/grad_ball.webp",
    text: "At their graduation ball, Junna started to feel cold after drinking iced tea but didn't have a jacket with her. Her close friends couldn't lend theirs since their coats were part of their outfits. That's when her best friend, Pot, asked Ronnel if he could lend his coat to Junna. He did—and it became another quiet but meaningful moment of God's perfect timing. 💙",
    date: "May 2017",
    reverse: false,
    hasVideo: false,
  },
  {
    title: "Playful Nicknames and Quiet Realizations",
    img: "/images/aug_2017.webp",
    text: "They worked at the same company—same position, same dreams. Before that, they had gone through job hunting together, encouraging each other through rejections and interviews until they finally landed jobs. This is when they grew even closer and started calling each other by their playful nicknames: “Buts” (short for “bone,” because he was skinny) and “Nget” (short for “panget”). But honestly, Ronnel couldn’t think of a real tease—because Junna always confidently said, “I’m beautiful!” 😄 During this time, Ronnel quietly began to see something more in Junna. She was simple, down-to-earth, and knew how to manage things at home. He started thinking… she’s wife material That playful friendship was the beginning of something special.",
    date: "August 2017",
    reverse: true,
    hasVideo: false,
  },
  {
    title: "A Little Flower",
    img: "/images/little_flower.webp",
    text: "Junna and Ronnel went with their group of friends to Batangas to celebrate the birthday of Junna's best friend's mom. They stayed for two days and enjoyed the simple celebration together. On the second day, while walking around Parang, they saw a small, cute flower. Ronnel picked it and gave it to Junna. She felt kilig, took a photo with it, and even made it her profile picture. They were still just friends back then—but little moments like this planted seeds of something deeper.",
    date: "November 2017",
    reverse: false,
    hasVideo: false,
  },
  {
    title: "Just the Two of Them",
    img: "/images/wgm_date.webp",
    text: "One of their close college friends, who had also been working with them, decided to resign. From that moment on, it was just the two of them—sharing meals together at Jollibee, Chowking, WGM, and other favorite spots. These simple moments became special. Without even realizing it, they were growing closer with each meal, each story, and each shared laugh. On weekends, Junna loved watching I Can See Your Voice. She would always invite Ronnel to join her, and they'd place playful bets on who would be chosen—and whether that person could actually sing or not. Come Tuesday, they'd relive those moments in the office, laughing about who guessed right and who got it hilariously wrong.",
    date: "December 2017",
    reverse: true,
    hasVideo: false,
  },
  {
    title: "The First Date",
    img: "/images/bay_walk.webp",
    text: "She needed a friend to accompany her to the Japanese Embassy for her passport, but no one else was available—only Ronnel. They went together, and afterward, they agreed to go to MOA. They ate at a Japanese restaurant, walked by the seaside, and shared a chocolate shake, joking around. She said she didn't want to be called babe as a call sign in a relationship, since one of the shake sizes was named babe. That day felt like their first date.",
    date: "January 2018",
    reverse: false,
    hasVideo: false,
  },
  {
    title: "The Gift Left Untouched",
    img: "/images/necklace.webp",
    text: "It was the day they knew they would soon be apart—Junna was going to Japan. Ronnel had bought a gift for Junna back in January 2018, but he was too shy (torpe) to give it to her. Even when the day came for her to leave, he still felt shy and kept the gift to himself. He felt sad inside, knowing this might be the last time they'd see each other for a while.",
    date: "May 2018",
    reverse: true,
    hasVideo: false,
  },
  {
    title: "Unspoken Goodbyes",
    img: "/images/my_day.webp",
    text: "It was the time when they finally confessed their feelings for each other. But Junna felt they weren't ready yet, so she asked to stop the regular chatting. It was a heartbreaking moment for both of them. Still, they quietly stayed connected—sharing My Day posts on Messenger, just to keep updated on each other's lives from afar.",
    date: "July 2018",
    reverse: false,
    hasVideo: false,
  },
  {
    title: "Reconnecting Through Games",
    img: "/images/games.webp",
    text: "A month later, Junna and their friends—including Ronnel—decided to play Mobile Legends together. During the game, Ronnel took the chance to talk to Junna again through the in-game chat. They slowly started reconnecting. When Junna later asked him to stop chatting once more, Ronnel gently insisted… and told her he truly wanted to pursue her.",
    date: "August 2018 ",
    reverse: true,
    hasVideo: false,
  },
  {
    title: "Meeting the Family",
    img: "/images/family_reunion.webp",
    text: "Even though Junna was in Japan, Ronnel had the courage to meet her family during a simple family reunion in the Philippines. Being an introvert, this wasn't easy for him, but he managed to talk and make a good impression on Junna's family. It was a meaningful step that showed how serious he was about their relationship and how God was guiding him.",
    date: "January 2019",
    reverse: false,
    hasVideo: false,
  },
  {
    title: "I Love You (But He Didn't Get It 😅)",
    img: "/images/iloveyou.webp",
    text: "After months of Ronnel patiently pursuing her, Junna finally gave her answer by saying, I love you. But… Ronnel didn't get it right away! 😅 (Originally, Junna planned to say it on November 7—but it was already 2 AM when she finally said it, so it officially became November 8.) That moment marked the beginning of their relationship—and God's beautiful plan unfolding. Fun fact: They started getting close in November 2016, and exactly two years later, they became a couple.",
    date: "November 8, 2018",
    reverse: true,
    hasVideo: false,
  },
  {
    title: "First Anniversary & A Sweet Surprise",
    img: "/images/1st_anniv.webp",
    text: "For their first anniversary, Ronnel surprised Junna with the help of the JFAAC Katsutadai Youth. What she thought was just a regular GGM at Fululu turned into a rooftop surprise celebration! Their youth family lovingly planned everything, and the special moment was even captured on video. Junna was deeply grateful for their time, support, and presence. That first year as a couple was filled with learning and adjustments. There were moments of disagreement, but it was also when Junna began to truly see Ronnel's heart—how he would stay quiet, listen, and choose peace. And each time Junna saw him peacefully sleeping after a tough day, her heart softened. The next morning, she would say sorry… and their love grew deeper.",
    date: "November 8, 2019",
    reverse: false,
    hasVideo: true,
    videoType: "local",
    videoUrl: "/facebook.mp4",
  },
  {
    title: "First Anniversary Flash-back Video",
    img: "/images/first_anniversary_flash_back.webp",
    text: "To have a flash-back of our journey from friends to girlfriend, Ronnel created a simple video and ofcourse we have a gift to each other Ronnel sent a flower, panda stuff toy and a box of that full of picture of us through the help of our friends Japan while Junna sent a watch to Ronnel through the help of her bestfriend",
    date: "November 8, 2019",
    reverse: true,
    hasVideo: true,
    videoType: "local",
    videoUrl: "/first_anniversary.mp4",
  },
  {
    title: "Ronnel's Birthday Surprise",
    img: "/images/ronnel_2019_birthday.webp",
    text: "Even though we're in a long-distance relationship, love always finds a way. With the help of our dearest friends, Junna planned a special surprise for Ronnel on his birthday. From miles away, she coordinated every detail, making sure he felt cherished and remembered. Distance may separate them physically, but their love continues to bridge every gap—turning even the simplest gesture into a beautiful memory.",
    date: "November 29, 2019",
    reverse: false,
    hasVideo: true,
    videoType: "local",
    videoUrl: "/ronnel_2019_birthday.mp4",
  },
  {
    title: "Our 2nd Anniversary",
    img: "/images/2nd_anniversary.webp",
    text: "For our 2nd anniversary, Junna surprised me with a beautiful artwork of one of our favorite photos together. Even though we're far apart, we still celebrated with an online date—just the two of us, eating KFC over a video call, laughing and sharing stories. It was simple, sweet, and full of love.",
    date: "November 8, 2020",
    reverse: true,
    hasVideo: false,
  },
  {
    title: "Happy Heart's Day",
    img: "/images/heart_day.webp",
    text: "With a little help from our friends, Ronnel secretly planned a surprise for Junna—roses and chocolates delivered to her. It was his way of showing love from afar, turning an ordinary day into something unforgettable. Her smile said it all—sometimes, the smallest surprises make the biggest memories.",
    date: "February 14, 2021",
    reverse: false,
    hasVideo: false,
  },
  {
    title: "Surprising Junna, Debut Style!",
    img: "/images/junna_debut_birthday.webp",
    text: "With love and teamwork, our family, friends, and churchmates came together to surprise Junna with a beautiful debut-style birthday celebration. She had no idea what was coming—but the moment she walked in, her eyes lit up with joy. It was a night filled with laughter, love, and unforgettable memories—because someone as special as Junna deserves nothing less.",
    date: "June 26, 2021",
    reverse: true,
    hasVideo: false,
  },
  {
    title: "Our Online Monthsary Date",
    img: "/images/monthsary_date.webp",
    text: "We ordered our favorite KFC meal and shared a cozy dinner at home—miles apart but connected through a video call. With every bite and every smile, it felt like we were right there beside each other. It was a simple moment, but one that reminded us how love can make even the distance feel close.",
    date: "September 8, 2021",
    reverse: false,
    hasVideo: false,
  },
  {
    title: "A Surprise Proposal",
    img: "/images/RonnelJunnaProposal.webp",
    text: "It was the day Junna returned to the Philippines. They were both so excited and had been praying for this moment. That day, Ronnel proposed to her in front of their family and friends. They had planned a date for March 14th, a Tuesday, and went to MOA — the same place where they felt like it was their first date. Junna thought he might propose there because she noticed him trying a ring on her hand at a store. But to her surprise, they just sat, talked a lot, and enjoyed the date — which she loved very much. Later, when he dropped her off at home, that's when the real proposal plan began. Unbeknownst to Junna, Ronnel had arranged the surprise with the help of her best friend Pot and their families. They have a video of the proposal itself — you can watch it here.",
    date: "March 14, 2023",
    reverse: true,
    hasVideo: true,
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=c-LAhOIwb-E",
  },
];

export const profileData: PersonProfile[] = [
  {
    name: "Ronnel Barashari",
    img: "/images/ronnel-profile.webp",
    text: 'Someone once told me that "when you meet the right person, you\'ll know." Well, I just knew. Right away, we connected in a way that left me feeling complete.',
  },
  {
    name: "Junna Kudo",
    img: "/images/junna-profile.webp",
    text: 'Someone once told me that "when you meet the right person, you\'ll know." Well, I just knew. Right away, we connected in a way that left me feeling complete.',
  },
];