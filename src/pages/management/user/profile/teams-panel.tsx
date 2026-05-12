import { Icon } from '@/components/icon';
import { fakeAvatars } from '@/_mock/utils';
import { Card, CardHeader, CardContent } from '@/ui/card';
import Button from '@/ui/button';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';

function TeamsPanel() {
  const items = [
    {
      icon: <Icon icon="logos:react" size={40} />,
      name: 'React Developers',
      desc: 'We don’t make assumptions about the rest of your technology stack, so you can develop new features in React.',
      members: fakeAvatars(25),
      tags: ['React', 'AntD']
    },
    {
      icon: <Icon icon="logos:vue" size={40} />,
      name: 'Vue.js Dev Team',
      desc: 'The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.',
      members: fakeAvatars(20),
      tags: ['Vue.js', 'Developer']
    },
    {
      icon: <Icon icon="logos:figma" size={40} />,
      name: 'Figma Resources',
      desc: 'Explore, install, use, and remix thousands of plugins and files published to the Figma Community by designers and developers.',
      members: fakeAvatars(45),
      tags: ['UI/UX', 'Figma']
    },
    {
      icon: <Icon icon="logos:html-5" size={40} />,
      name: 'Only Beginners',
      desc: 'Learn the basics of how websites work, front-end vs back-end, and using a code editor. Learn basic HTML, CSS, and…',
      members: fakeAvatars(50),
      tags: ['CSS', 'HTML']
    },
    {
      icon: <Icon icon="logos:adobe-xd" size={40} />,
      name: 'Creative Designers',
      desc: 'A design or product team is more than just the people on it. A team includes the people, the roles they play.  ',
      members: fakeAvatars(55),
      tags: ['Sketch', 'XD']
    }
  ];
  return (
    <div className="md: grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <Card key={index} className="w-full">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {item.icon}
              <span className="text-xl opacity-70">{item.name}</span>
            </div>
            <div className="flex opacity-70">
              <Button variant="ghost" size="icon">
                <Icon icon="solar:star-line-duotone" size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon icon="fontisto:more-v-a" size={18} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="my-4 opacity-70">{item.desc}</p>
            <div className="flex justify-between">
              <div className="flex">
                {item.members.slice(0, 4).map((sub, subIndex) => (
                  <Avatar>
                    <AvatarImage src={sub} key={subIndex} />
                  </Avatar>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                {item.tags.map((sub, subIndex) => (
                  <Badge key={subIndex} variant="info">
                    {sub}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TeamsPanel;
