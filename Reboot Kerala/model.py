
"""Reboot Kerala Hackathon"""
"""Importing required Libraries"""
import numpy as np
import pandas as pd
import math
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import random
import pickle

"""Importing Datasets and Locating them"""
dataset = pd.read_csv("/home/sandeep/Documents/unisys2/dataset.csv")
x = dataset.iloc[:10000, 7:8]
y = dataset.iloc[:10000, 8:9]
z = dataset.iloc[:10000, 4:5]
w = dataset.iloc[:10000, 5:6]
print(x, y)

"""Feature Scaling"""
sc = StandardScaler()
x = sc.fit_transform(x).reshape(-1, 1)
y = sc.fit_transform(y).reshape(-1, 1)
w = sc.fit_transform(w).reshape(-1, 1)
z = sc.fit_transform(z).reshape(-1, 1)


"""Fitting SVR into Dataset"""
from sklearn.svm import NuSVR
regressor = NuSVR(kernel='rbf')
regressor.fit(x, y)
regressor.fit(z, w)

"""Splitting Datasets into Test and Train Data"""
"""Arrival Datasplit"""
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)
sc = StandardScaler()
x_train = sc.fit_transform(x_train)
y_train = sc.fit_transform(y_train)
x_test = sc.fit_transform(x_test)
y_test = sc.fit_transform(y_test)

"""Departure Datasplit"""
z_train, z_test, w_train, w_test = train_test_split(z, w, test_size=0.2, random_state=0)
sc = StandardScaler()
z_train = sc.fit_transform(z_train)
w_train = sc.fit_transform(w_train)
z_test = sc.fit_transform(z_test)
w_test = sc.fit_transform(w_test)

"""Plotting Training Dataset"""
plt.scatter(x_train, y_train, color='black')
plt.scatter(x_train, regressor.predict(x_train), color="red")
plt.xlabel("Sch. Arrival Time")
plt.ylabel("Actual Arrival Time")
plt.show()

"""Making Prediction"""
"""Arrival prediction"""
X = sc.inverse_transform(x_test)
Y = regressor.predict(X)
y_pred = sc.inverse_transform(regressor.predict(X))
y = sc.inverse_transform(y)

"""Departure prediction"""
Z = sc.inverse_transform(z_test)
W = regressor.predict(Z)
w_pred = sc.inverse_transform(regressor.predict(Z))
w = sc.inverse_transform(w)


"""Downloading model into the Localsystem"""
pickle.dump(regressor, open("model.pkl", 'wb'))

"""Reloading the model"""
pickle.load(open("model.pkl", "rb"))
print(regressor.predict(X))

"""Plotting Predicted Data"""
plt.scatter(X, y_test, color='blue')
plt.scatter(X, y_pred, color="red")
plt.xlabel("Sch. Arrival Time")
plt.ylabel("Predicted Arrival Time")
plt.show()

"""End"""



