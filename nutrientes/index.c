#include <stdio.h>

int func(int n)
{
    if (n > 0)
    {
        printf("*");
        return n * func(n - 1);  // chamada recursiva correta
    }
    else
    {
        return 1; // caso base do fatorial
    }
}

int main()
{
    int n;

    printf("Digite o valor de n:\n");
    scanf("%d", &n);

    int resultado = func(n);

    printf("\nFatorial de %d é: %d\n", n, resultado);

    return 0;
}
