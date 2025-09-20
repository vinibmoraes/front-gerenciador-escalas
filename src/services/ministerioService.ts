export interface Ministerio {
  id: string;
  nome: string;
}

const mockMinisterios: Ministerio[] = [
  { id: 'b514617d-c8c1-4583-9724-835e027ed294', nome: 'Nacoes' },
];

class MinisterioService {
  async getMinisterios(): Promise<Ministerio[]> {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockMinisterios);
      }, 500);
    });
  }
}

export const ministerioService = new MinisterioService();
