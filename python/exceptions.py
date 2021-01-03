import sys

try:
    x = int(input("x: "))
    y = int(input("y: "))
except ValueError:
    print("Error: invalid input")
    sys.exit(1)

def divide(x, y):
    try:
        return x / y
    except ZeroDivisionError:
        print("Error: Cannot divide by 0")
        sys.exit(1)

print(f"{x} / {y} = {divide(x, y)}")
