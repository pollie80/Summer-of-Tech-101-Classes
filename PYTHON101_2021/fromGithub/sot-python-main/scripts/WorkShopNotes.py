word = "e"
repeat_times = 16

print("y", (word * repeat_times), "t","\n")

a_list = []
if a_list:
    print("list is not empty")
else:
    print("list is empty","\n")

num = 1 if len(a_list) > 0 else 0
print(num,"\n")

for letter in "RESPECT":
    print(letter)
print("\n")

def double(input: int) -> int:
    return input * 2


print(double(1))
print(double('yeet'),"\n")

#cant change tuples
t = (1, "string", 9.0)
print(t)
print(t[0])
print(t[1],"\n")

groceries = []
secret_list = ["chocolate", "whipped cream"]
groceries.append("banana") # add a singular item
groceries.append(secret_list) # add a list AS A SINGULAR ITEM
groceries.extend(secret_list) # add contents from another list
groceries.append(5)
print(groceries, "\n")

#set (unique objects)
bool_possibilities = {True, False}
bool_possibilities.add(None)
bool_possibilities.add(True) # doesnt change because unique True is already there
print(bool_possibilities, "\n")

me = {"name": "Tian", "employer": "Trade Legion Ltd"}
me["height"] = 171
me["course"] = ["COMP307", "ENGR301", "SWEN301", "SWEN304"]
print("height:", me["height"])
print(me, "\n")
