type Step = {
  title: string;
  body: string;
};

export function ProcessTimeline({ steps }: { steps: readonly Step[] }) {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-primary/15" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
        {steps.map((step) => (
          <div key={step.title} className="relative group">
            <div className="hidden lg:block w-3 h-3 rounded-full bg-primary border-4 border-background absolute -top-[5px] left-0 z-10" />
            <div className="bg-card border border-border p-6 h-full hover:border-primary/30 transition-colors">
              <h3 className="font-subtitle text-2xl text-primary mb-3">{step.title}</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
