import random

print("I'm thinking of a number between 1 and 100")
number = random.randint(1, 100)
guessed_correctly = False

while not guessed_correctly:
    try:
        guess = int(input("Guess a number: "))
    except ValueError:
        print("Please enter a number.")
        continue

    if guess > number:
        print("Go lower")
    elif guess < number:
        print("Go higher")
    else:
        guessed_correctly = True

print("Correct!")