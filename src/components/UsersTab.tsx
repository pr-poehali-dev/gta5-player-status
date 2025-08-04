import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const UsersTab = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Управление пользователями</h2>
        <Button className="gta-gradient text-white">
          <Icon name="UserPlus" size={16} className="mr-2" />
          Добавить пользователя
        </Button>
      </div>

      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Права доступа</CardTitle>
          <CardDescription>Управление ролями и разрешениями</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Icon name="Lock" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Раздел управления пользователями</p>
            <p className="text-sm text-muted-foreground mt-2">Здесь будет интерфейс для управления ролями</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersTab;