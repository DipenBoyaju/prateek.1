import clsx from 'clsx';

const colorMap = {
  blue: {
    gradient: 'from-blue-100',
    border: 'border-blue-200',
    icon: 'bg-blue-500',
  },
  yellow: {
    gradient: 'from-yellow-100',
    border: 'border-yellow-200',
    icon: 'bg-yellow-500',
  },
  emerald: {
    gradient: 'from-emerald-100',
    border: 'border-emerald-200',
    icon: 'bg-emerald-500',
  },
  red: {
    gradient: 'from-purple-100',
    border: 'border-purple-200',
    icon: 'bg-purple-500',
  },
};

const QuickStatCard = ({ Icon, title, count, color = 'blue', isLoading }) => {
  const styles = colorMap[color] || colorMap.blue;

  return (
    <div className={clsx(
      'flex justify-between items-center shadow-md p-5 rounded-xl overflow-hidden bg-gradient-to-r to-white border',
      styles.gradient,
      styles.border
    )}>
      <div>
        <p className="text-zinc-600 text-sm uppercase tracking-wider font-medium">{title}</p>
        <p className="text-3xl font-bold text-zinc-800 mt-1">{
          isLoading ? <span className='size-6 bg-zinc-300 rounded-sm animate-pulse'></span> : typeof count === 'number' ? count : 0
        }</p>
      </div>
      <div className={clsx(styles.icon, 'p-4 rounded-full text-white shadow-lg')}>
        <Icon size={24} />
      </div>
    </div>
  );
};

export default QuickStatCard;