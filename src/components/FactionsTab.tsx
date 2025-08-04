import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Faction {
  name: string;
  leader: string;
  members: number;
  color: string;
}

interface FactionsTabProps {
  factions: Faction[];
}

const FactionsTab = ({ factions }: FactionsTabProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Управление фракциями</h2>
        <Button className="gta-gradient text-white">
          <Icon name="Plus" size={16} className="mr-2" />
          Создать фракцию
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {factions.map((faction, index) => (
          <Card key={index} className="card-gradient hover-scale">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${faction.color}-500`}></div>
                  {faction.name}
                </CardTitle>
                <Badge variant="outline">{faction.members} участников</Badge>
              </div>
              <CardDescription>Лидер: {faction.leader}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Активность</p>
                  <Progress value={Math.random() * 100} className="w-24" />
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Управление
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FactionsTab;