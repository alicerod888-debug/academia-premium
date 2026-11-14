export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
      <p className="gold-text font-display text-[8rem] font-black leading-none">404</p>
      <h1 className="font-display text-4xl font-extrabold uppercase">Página não encontrada</h1>
      <p className="max-w-md text-mist">O endereço que você tentou abrir não existe. Volte ao início e continue sua jornada.</p>
      <a href="/" className="btn-gold">Voltar ao início</a>
    </main>
  );
}
