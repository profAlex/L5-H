export type BlogInputModel = {
    // а можно изменить регистр букв в названии типа??
    // это как-то повлияет на прохождение тестов на платформе инкубатора?
    name: string;
    description: string;
    websiteUrl: string;
};