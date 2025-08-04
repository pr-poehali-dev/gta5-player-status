import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg gta-gradient flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">GTA 5 Admin Panel</h1>
              <p className="text-muted-foreground text-sm">Управление сервером и игроками</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="px-3 py-1">
              <Icon name="Activity" size={16} className="mr-2" />
              Сервер активен
            </Badge>
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;